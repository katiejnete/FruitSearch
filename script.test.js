describe('search tests', function () {
    it('should return all indices from fruitnIdx array that matches user input', () => {
        inputValMock = 'app';
        expect(search(inputValMock)).toEqual([0,14,63]);
    });
})