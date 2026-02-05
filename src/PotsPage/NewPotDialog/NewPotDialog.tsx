import { useId } from "react";
import FloatingSelect from "../../util/FloatingSelect/FloatingSelect";
import FloatingSelectOption from "../../util/FloatingSelect/FloatingSelectOption/FloatingSelectOption";
import "../Pot/Pot.css";
import "./NewPotDialog.css";
import "/src/util/Dialog.css";

type NewPotDialogProps = {
  newPotDialogRef: React.RefObject<HTMLDialogElement | null>;
  onFormSubmit: () => void;
};

function NewPotDialog({ newPotDialogRef, onFormSubmit }: NewPotDialogProps) {
  const dropdownId = "new-pot-dialog" + useId();
  const themeColors = {
    green: "#277c78",
    yellow: "#f2cdac",
    cyan: "#82c9d7",
    navy: "#626070",
    red: "#c94736",
    purple: "#826cb0",
    turquoise: "#597c7c",
    brown: "#93674f",
    magenta: "#934f6f",
    blue: "#3f82b2",
    navyGreen: "#97a0ac",
    armyGreen: "#7f9161",
    gold: "#cab361",
    orange: "#be6c49",
  };
  return (
    <dialog ref={newPotDialogRef} closedby="any" className="dialog">
      <form onSubmit={onFormSubmit} className="new-pot-dialog__form">
        <div className="dialog__top-row">
          <h1>Add New Pot</h1>
          <button
            onClick={() => closeNewPotDialog(newPotDialogRef)}
            type="button"
            className="dialog__close-btn"
          >
            <img
              className="dialog__close-icon"
              src="/images/icon-close-modal.svg"
            />
          </button>
        </div>
        <p className="dialog__paragraph">
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases.
        </p>
        <label className="dialog__label" htmlFor="pot-name">
          Pot name
        </label>
        <input
          className="dialog__input"
          id="pot-name"
          placeholder="e. g. Rainy Days"
        />
        <label className="dialog__label" htmlFor="pot-target">
          Target
        </label>
        <input
          className="dialog__input"
          id="pot-target"
          placeholder="$ e. g. 2000"
        />
        <label className="dialog__label" htmlFor={dropdownId}>
          Theme
        </label>
        <FloatingSelect
          optionsClassName="new-pot-dialog__select-options"
          frontButton={
            <>
              <button
                type="button"
                id={dropdownId}
                className={"new-pot-dialog__dropdown squared-border"}
              >
                <div
                  className="pot__color-ball"
                  style={{ backgroundColor: "#277c78" }}
                ></div>
                <p>Green</p>
                <img
                  className="caret-down"
                  src="./images/icon-caret-down.svg"
                />
              </button>
            </>
          }
        >
          {Object.entries(themeColors).map(([theme, hexCode], index) => (
            <FloatingSelectOption
              key={index}
              handleClick={() => {}}
              type="button"
            >
              <>
                <div
                  className="pot__color-ball"
                  style={{ backgroundColor: hexCode }}
                ></div>
                {theme}
              </>
            </FloatingSelectOption>
          ))}
        </FloatingSelect>
        <button
          className="dialog__submit-btn dialog__submit-btn--black-bg"
          type="submit"
        >
          Add Pot
        </button>
      </form>
    </dialog>
  );
}

function closeNewPotDialog(ref: React.RefObject<HTMLDialogElement | null>) {
  if (ref.current !== null) {
    ref.current.requestClose();
  }
}

export default NewPotDialog;
