import {
  Box,
  FormControlLabel,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { createContext, useContext, useEffect, useState, memo, useCallback } from "react";

enum IceCreamShop {
  WHATS_THE_SCOOP = "What's the Scoop",
  CONE_KINGDOM = "Cone Kingdom",
  WENDYS = "Wendy's",
}

const IceCreamContext = createContext<{
  flavors: string[];
  filter: string;
  updateFilter: (filter: string) => void;
}>({} as any);

const Filter = () => {
  const { filter, updateFilter } = useContext(IceCreamContext);
  return (
    <div>
      <InputLabel>Search for your favorite flavor</InputLabel>
      <Input
        value={filter}
        onChange={(event) => updateFilter(event.target.value)}
      />
    </div>
  );
};

const VisibleFlavors = ({ fetchFlavors }: { fetchFlavors: () => string[] }) => {
  const { filter } = useContext(IceCreamContext);
  const flavors = fetchFlavors();
  const visibleFlavors = flavors.filter((flavor) => flavor.includes(filter));

  return (
    <div>
      {visibleFlavors.map((flavor) => (
        <div key={flavor}>{flavor}</div>
      ))}
    </div>
  );
};

const Header = memo(({ fetchFlavors }: { fetchFlavors: () => string[] }) => {
  const [renderCount, setRenderCount] = useState(0);
  const flavors = fetchFlavors();
  useEffect(
    () => setRenderCount((renderCount) => renderCount + 1),
    [fetchFlavors]
  );

  return (
    <div>
      <h1>Choose from our {flavors.length} options</h1>
      <p>Header rendered {renderCount} times</p>
    </div>
  );
});

export const App = () => {
  const [iceCreamShop, setIceCreamShop] = useState(
    IceCreamShop.WHATS_THE_SCOOP
  );
  const [filter, setFilter] = useState("");
  const updateFilter = (filter: string) => {
    setFilter(filter);
  };

  const fetchFlavors = useCallback((): string[] => {
    switch (iceCreamShop) {
        case IceCreamShop.WHATS_THE_SCOOP:
            return ["vanilla", "chocolate", "strawberry", "mint chip", "rocky road", "birthday cake", "cookie dough", "coffee", "pistachio", "butter pecan", "cotton candy", "bubble gum", "peanut butter", "black cherry"];
        case IceCreamShop.CONE_KINGDOM:
            return ["ube", "matcha oreo", "corn bread", "fruit loops", "s'mores", "black sesame", "lemon", "funnel cake"];
        case IceCreamShop.WENDYS:
            return ["chocolate frosty", "vanilla frosty", "strawberry frosty"];
    }
  }, [iceCreamShop]);

  return (
    <Box pl={3} pt={3}>
      <InputLabel>Viewing ice cream from</InputLabel>
      <RadioGroup
        row
        name="ice-cream-shop"
        value={iceCreamShop}
        onChange={(_e, shop) => setIceCreamShop(shop as IceCreamShop)}
      >
        <FormControlLabel
          value={IceCreamShop.WHATS_THE_SCOOP}
          control={<Radio />}
          label={IceCreamShop.WHATS_THE_SCOOP}
        />
        <FormControlLabel
          value={IceCreamShop.CONE_KINGDOM}
          control={<Radio />}
          label={IceCreamShop.CONE_KINGDOM}
        />
        <FormControlLabel
          value={IceCreamShop.WENDYS}
          control={<Radio />}
          label={IceCreamShop.WENDYS}
        />
      </RadioGroup>
      <Stack spacing={3} direction="column">
        <Header fetchFlavors={fetchFlavors} />
        <IceCreamContext.Provider value={{ flavors: [], filter, updateFilter }}>
          <Filter />
          <VisibleFlavors fetchFlavors={fetchFlavors} />
        </IceCreamContext.Provider>
      </Stack>
    </Box>
  );
};
