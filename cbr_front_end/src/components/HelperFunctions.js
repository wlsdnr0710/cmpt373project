function containsValidLabel(label) {
  if (label !== undefined) {
    return true;
  } else {
    return false;
  }
}

export function getLabelTag(label) {
  if (containsValidLabel(label)) {
    return (
      <div>
        <label>{label}</label>
      </div>
    );
  } else {
    return;
  }
}
