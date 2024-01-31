describe('search tests', function () {
    it('should return all indices from fruitnIdx array that matches user input', () => {
        const inputValMock = 'app';
        expect(search(inputValMock,suggestions)).toEqual([0,14,63]);
    });

    it('should return all indices from fruitnIdx array that matches user input regardless of casing', () => {
        const inputValMock = 'ApP';
        expect(search(inputValMock,suggestions)).toEqual([0,14,63]);
    });
})

describe('findBold tests', function () {
    it('should bold correctly based on user input', () => {
        const fruitNameMock = 'Avocado 🥑';
        inputValMock = 'avo';
        expect(findBold(fruitNameMock,inputValMock)).toEqual(['','Avo','cado 🥑']);
    });
    it('should bold correctly based on user input regardless of casing', () => {
        const fruitNameMock = 'Juniper berry';
        inputValMock = 'PER';
        expect(findBold(fruitNameMock,inputValMock)).toEqual(['Juni','per ',' berry']);
    });
})

describe('showSuggestions tests', function () {
    it('should give correct string from results index to select correct li in showSuggestions function', () => {
        const idx = 33;
        const fruitStr = fruit[idx];
        const queryStr = `li[data-fruit='${fruitStr}']`;
        expect(queryStr).toEqual(`li[data-fruit='Kiwifruit']`);
    });
})