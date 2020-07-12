const voca = jest.genMockFromModule("voca");

voca.capitalize = (word) => `${word} capitalize mocked!`;

export default voca;
