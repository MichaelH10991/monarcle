import "./Hint.css";

const Hint = ({ isCorrect, isLoading, theme = {}, hints = [] }) => {
  // do not show if we have no hints yet (initial state)
  if (!hints.length) {
    return undefined;
  }

  const previousHint = hints[hints.length - 2] || "";
  const currentHint = hints[hints.length - 1];
  const hint = isLoading ? previousHint : currentHint;

  // do not show if the answer was correct
  if (isCorrect) {
    return undefined;
  }

  // do not show if we dont have a hint
  if (!hint) {
    return undefined;
  }

  return (
    <div className="hint" style={{ background: theme.secondary }}>
      <div className="title">Hint: {hints.length}</div>
      {hint}
    </div>
  );
};

export default Hint;
