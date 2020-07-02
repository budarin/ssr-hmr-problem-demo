const intersect = (a: any[], b: any[]): any[] => {
    // eslint-disable-next-line
    return a.filter(Set.prototype.has, new Set(b));
};

export default intersect;
