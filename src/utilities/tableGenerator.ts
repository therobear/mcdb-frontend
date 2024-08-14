const tableGenerator = (array: any[], size: number) => {
    const ROWSIZE: number = Math.ceil(array.length / size);

    return Array.from({length: ROWSIZE}, (item: any, index: number) => 
        array.slice(index * ROWSIZE, index * ROWSIZE + ROWSIZE)
    );
}

export default tableGenerator;