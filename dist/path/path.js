function getPathExtension(path) {
    const lastDotIndex = path.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === path.length - 1) {
        return '';
    }
    return path.substring(lastDotIndex + 1);
}
export {};
//# sourceMappingURL=path.js.map