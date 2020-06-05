import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { debounce } from "debounce";
import { isFunction, isString } from "../utils";
import { usePrevious, useStateWithCallback } from "../hooks";

let id = 0;
function generateId() {
  return `tailwind-ui-listbox-id-${++id}`;
}

const ListboxContext = createContext({});
const ListboxContextProvider = ListboxContext.Provider;

function useListboxContext() {
  return useContext(ListboxContext);
}

export const ListboxLabel = ({ children, ...rest }) => {
  const { labelId, setLabelId } = useListboxContext();
  useEffect(() => {
    setLabelId(generateId());
  }, [setLabelId]);
  return (
    <span {...rest} id={labelId}>
      {children}
    </span>
  );
};

export const ListboxButton = ({ children, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [id, setId] = useState();
  const { isOpen, toggle, labelId, setButtonRef } = useListboxContext();
  useEffect(() => {
    setId(generateId());
  }, []);

  return (
    <button
      ref={(ref) => setButtonRef(ref)}
      id={id}
      type="button"
      aria-haspopup="listbox"
      aria-labelledby={`${labelId} ${id}`}
      aria-expanded={isOpen ? "true" : "false"}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={toggle}
      {...rest}
    >
      {isFunction(children) ? children({ isFocused }) : children}
    </button>
  );
};

export const ListboxList = ({ children, ...rest }) => {
  const {
    close,
    focus,
    select,
    typeahead,
    type,
    setValues,
    buttonRef,
    setListboxListRef,
    activeItemValue,
    setActiveItemValue,
    getActiveDescendant,
    ariaLabelledBy,
  } = useListboxContext();
  const values = Children.map(children, (child) => child.props.value);
  useEffect(() => {
    setValues(values);
  }, [values.toString(), setValues]);
  const focusedIndex = activeItemValue ? values.indexOf(activeItemValue) : -1;
  const activeDescendant = getActiveDescendant();
  return (
    <ul
      ref={(ref) => setListboxListRef(ref)}
      tabIndex={0}
      role="listbox"
      aria-activedescendant={activeDescendant}
      aria-labelledby={ariaLabelledBy}
      onBlur={(e) => {
        // React's onBlur works like onFocusOut on browsers, meaning it bubbles and thus we get blur event from children here.
        // Cf. https://github.com/facebook/react/issues/6410
        if (e.relatedTarget === buttonRef) {
          return;
        }
        close();
      }}
      onMouseLeave={() => setActiveItemValue(undefined)}
      onKeyDown={(e) => {
        let indexToFocus;
        switch (e.key) {
          case "Esc":
          case "Escape":
            e.preventDefault();
            close();
            break;
          case "Tab":
            e.preventDefault();
            break;
          case "Up":
          case "ArrowUp":
            e.preventDefault();
            indexToFocus =
              focusedIndex - 1 < 0 ? values.length - 1 : focusedIndex - 1;
            focus(values[indexToFocus]);
            break;
          case "Down":
          case "ArrowDown":
            e.preventDefault();
            indexToFocus =
              focusedIndex + 1 > values.length - 1 ? 0 : focusedIndex + 1;
            focus(values[indexToFocus]);
            break;
          case "Spacebar":
          case " ":
            e.preventDefault();
            if (typeahead !== "") {
              type(" ");
            } else if (activeItemValue) {
              select(activeItemValue);
            }
            break;
          case "Enter":
            e.preventDefault();
            if (activeItemValue) {
              select(activeItemValue);
            }
            break;
          default:
            if (!(isString(e.key) && e.key.length === 1)) {
              return;
            }
            e.preventDefault();
            type(e.key);
            return;
        }
      }}
      {...rest}
    >
      {children}
    </ul>
  );
};

export const ListboxOption = ({ value, children }) => {
  const {
    select,
    activeItemValue,
    setActiveItemValue,
    selectedValue,
    registerOptionId,
    unregisterOptionId,
    registerOptionRef,
    unregisterOptionRef,
  } = useListboxContext();
  const ref = useRef(null);
  const [id, setId] = useState();
  useEffect(() => {
    const id = generateId();
    setId(id);
  }, []);
  const previousValue = usePrevious(value);
  useEffect(() => {
    if (previousValue) {
      unregisterOptionId(previousValue);
    }
    unregisterOptionRef(value);
    if (id) {
      registerOptionId(value, id);
    }
    if (ref.current) {
      registerOptionRef(value, ref.current);
    }
  }, [
    value,
    id,
    previousValue,
    registerOptionId,
    registerOptionRef,
    unregisterOptionId,
    unregisterOptionRef,
  ]);
  const isActive = activeItemValue === value;
  const isSelected = selectedValue === value;

  return (
    <li
      ref={ref}
      id={id}
      role="option"
      aria-selected={isSelected ? "true" : "false"}
      onClick={() => {
        select(value);
      }}
      onMouseEnter={() => {
        setActiveItemValue(value);
      }}
    >
      {isFunction(children) ? children({ isActive, isSelected }) : children}
    </li>
  );
};
export const Listbox = ({
  value,
  onChange,
  children,
  "aria-labelledby": ariaLabelledBy,
  ...rest
}) => {
  const [buttonRef, setButtonRef] = useState(null);
  const [listboxListRef, setListboxListRef] = useState(null);
  const [isOpen, setIsOpen] = useStateWithCallback(false, (isOpen) => {
    if (isOpen) {
      listboxListRef && listboxListRef.focus();
    } else {
      buttonRef && buttonRef.focus();
    }
  });
  const [activeItemValue, setActiveItemValue] = useStateWithCallback(
    value,
    (value) => {
      if (!value) {
        return;
      }

      const optionRef = optionRefs[value];
      if (optionRef) {
        // When the value changes, make sure the option is visible
        optionRef.ref.scrollIntoView({
          block: "nearest",
        });
      }
    }
  );
  const [typeahead, setTypeahead] = useState("");
  const [values, setValues] = useState([]);
  const [labelId, setLabelId] = useState();
  const [optionIds, setOptionIds] = useState({});
  const [optionRefs, setOptionRefs] = useState({});

  const focus = (value) => {
    setActiveItemValue(value);
  };
  const open = () => {
    setIsOpen(true);
    focus(value);
  };
  const close = () => {
    setIsOpen(false);
  };
  const toggle = () => {
    isOpen ? close() : open();
  };
  const select = (value) => {
    onChange(value);
    close();
  };
  const clearTypeahead = debounce(() => {
    setTypeahead("");
  }, 500);
  const type = (char) => {
    const newTypeahead = typeahead + char;
    setTypeahead(newTypeahead);

    const match = Object.values(optionRefs).find(({ ref }) => {
      return ref.innerText.toLowerCase().startsWith(newTypeahead.toLowerCase());
    });

    if (match) {
      focus(match.value);
    }

    clearTypeahead();
  };
  const registerOptionId = useCallback(
    (value, optionId) => {
      setOptionIds((optionIds) => ({ ...optionIds, [value]: optionId }));
    },
    [setOptionIds]
  );
  const unregisterOptionId = useCallback(
    (value) => {
      setOptionIds((optionIds) => {
        const { [value]: _deletedKey, ...newOptionIds } = optionIds;
        return newOptionIds;
      });
    },
    [setOptionIds]
  );
  const registerOptionRef = useCallback(
    (value, ref) => {
      setOptionRefs((optionRefs) => ({
        ...optionRefs,
        [value]: { value, ref },
      }));
    },
    [setOptionRefs]
  );
  const unregisterOptionRef = useCallback(
    (value) => {
      setOptionRefs((optionRefs) => {
        const { [value]: _deletedKey, ...newOptionRefs } = optionRefs;
        return newOptionRefs;
      });
    },
    [setOptionRefs]
  );

  return (
    <div {...rest}>
      <ListboxContextProvider
        value={{
          isOpen,
          toggle,
          close,
          focus,
          selectedValue: value,
          select,
          typeahead,
          values,
          setValues,
          type,
          labelId,
          setLabelId,
          buttonRef,
          setButtonRef,
          listboxListRef,
          setListboxListRef,
          activeItemValue,
          setActiveItemValue,
          registerOptionId,
          unregisterOptionId,
          registerOptionRef,
          unregisterOptionRef,
          getActiveDescendant: () =>
            activeItemValue && optionIds[activeItemValue],
          ariaLabelledBy: ariaLabelledBy,
        }}
      >
        {isFunction(children) ? children({ isOpen }) : children}
      </ListboxContextProvider>
    </div>
  );
};
