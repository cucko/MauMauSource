import { cleanup } from '@testing-library/react';
import { ICard } from '../model/Card';
import { generateDeck, shuffleCards } from '../methods/DeckMethods';


afterEach(cleanup)

describe('test generating cards', () => {
  it('should return 52 cards', () => {
    expect(generateDeck().length).toEqual(52)
  })

  it('should return same length array', () => {
    expect(shuffleCards(new Array<ICard>(52)).length).toEqual(52);
  })
})


// it('Reducer changes stateprop1 from false to true', () => {
//    const { container, getByText } = render(<GameSimple />);

//    expect(getByText(/stateprop1 is/i).textContent).toBe("stateprop1 is false")

//    fireEvent.click(getByText("Next turn"))

//    expect(getByText(/stateprop1 is/i).textContent).toBe("stateprop1 is true")
// })