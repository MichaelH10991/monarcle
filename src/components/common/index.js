import React from "react";

const CorrectnessWrapper = ({ state, style = {}, children }) => {
  const styles = {
    correct: style.correct || "#09ae00",
    incorrect: style.incorrect || "#c62626",
    loading: style.loading || "#828282",
  };

  if (React.isValidElement(children)) {
    // const existingClass = children.props.className || "";
    const existingStyle = children.props.style || {};
    const style =
      state === undefined
        ? existingStyle
        : { ...existingStyle, background: styles[state] };

    return React.cloneElement(children, {
      // className: `${existingClass} ${className}`.trim(),
      style,
    });
  }
};

const Badge = ({ children, style = {} }) => {
  return (
    <div style={style} className={`badge`}>
      {children}
    </div>
  );
};

export { CorrectnessWrapper, Badge };
