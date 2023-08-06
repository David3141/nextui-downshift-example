import { useCombobox } from 'downshift'
import { useState } from 'react'
import { Card, Input } from '@nextui-org/react'

const colors = [
  'Black',
  'Red',
  'Green',
  'Blue',
  'Orange',
  'Purple',
  'Pink',
  'Orchid',
  'Aqua',
  'Lime',
  'Gray',
  'Brown',
  'Teal',
  'Skyblue',
]

function DownshiftExample() {
  const [inputItems, setInputItems] = useState(colors)

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({inputValue}) => {
      setInputItems(
        colors.filter(item =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() ?? ''),
        ),
      )
    },
  })
  return (
    <div className='max-w-4xl p-10 flex flex-col gap-8'>
      <p>
        Click into the input field and navigate through the results with the keyboard.
        Every second result will be skipped.
        When changing the input field from NextUI's "Input" to a standard "input",
        keyboard navigation works as expected again.
      </p>
      <div className='flex flex-col w-fit'>
        <label
          className='font-bold'
          {...getLabelProps()}
        >
          Choose an element:
        </label>
        <div className='flex'>
          <Input
            {...getInputProps()} 
            data-testid="combobox-input"
          />
          <button
            style={{padding: '4px 8px'}}
            aria-label="toggle menu"
            data-testid="combobox-toggle-button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
          <button
            style={{padding: '4px 8px'}}
            aria-label="toggle menu"
            data-testid="clear-button"
            onClick={() => selectItem(null)}
          >
            &#10007;
          </button>
        </div>
        <Card
          as="ul"
          {...getMenuProps()}
          className='bg-white list-none p-0 mt-2'
        >
          {isOpen &&
            inputItems.map((item, index) => (
              <li
                className={`p-2 ${highlightedIndex === index && 'bg-primary text-white'}`}
                key={`${item}${index}`}
                {...getItemProps({
                  item,
                  index,
                })}
              >
                {item}
              </li>
            ))}
        </Card>
      </div>
    </div>
  )
}

export default DownshiftExample
