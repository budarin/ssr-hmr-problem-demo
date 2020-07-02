const difference = (a: any[], b: any[]): any[] => {
    const set1 = new Set([...a]);
    const set2 = new Set([...b]);

    // eslint-disable-next-line
    return [...set1].filter((x) => !set2.has(x));
};

export default difference;
