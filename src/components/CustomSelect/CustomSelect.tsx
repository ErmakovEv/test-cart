import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 150,
      margin: 0,
      padding: 0,
    },
  },
};

const categories = ['Билеты', 'Одежда', 'Электроника'];

function getStyles(name: string, categories: readonly string[], theme: Theme) {
  return {
    fontWeight:
      categories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CustomSelect() {
  const theme = useTheme();
  const [categoryName, setCategoryName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl sx={{ m: 1, width: '100%', mt: 3 }}>
      <Select
        multiple
        displayEmpty
        value={categoryName}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Категории товаров</em>;
          }

          return selected.join(', ');
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>Placeholder</em>
        </MenuItem>
        {categories.map((cat) => (
          <MenuItem
            key={cat}
            value={cat}
            style={getStyles(cat, categoryName, theme)}
          >
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
