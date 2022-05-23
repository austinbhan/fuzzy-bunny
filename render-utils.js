export function renderOption(family) {
    const option = document.createElement('option');
    option.value = family.id;
    option.textContent = family.name;
    return option;
}