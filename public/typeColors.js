const typeColorMap = {
  grass: {
    primary: "#57C278",
    secondary: "#D9F7E9",
  },
  water: {
    primary: "#82CFFA",
    secondary: "#E8F8FF",
  },
  bug: {
    primary: "#A6D157",
    secondary: "#F0F8E2",
  },
  fighting: {
    primary: "#E06B69",
    secondary: "#FDE7E8",
  },
  poison: {
    primary: "#DB6EBF",
    secondary: "#FAE9F5",
  },
  electric: {
    primary: "#FFBA05",
    secondary: "#FFF5D9",
  },
  fire: {
    primary: "#FF8A29",
    secondary: "#FFEEDF",
  },
  flying: {
    primary: "#8DD5E4",
    secondary: "#D9F7E9",
  },
  ice: {
    primary: "#B6E4FE",
    secondary: "#E3F7FF",
  },
  normal: {
    primary: "#BDBDBC",
    secondary: "#E1E1E1",
  },
  ground: {
    primary: "#DB8638",
    secondary: "#FFC195",
  },
  fairy: {
    primary: "#FEA7E8",
    secondary: "#FFE0F6",
  },
  psychic: {
    primary: "#F17878",
    secondary: "#FFD3D3",
  },
  rock: {
    primary: "#CEB7A4",
    secondary: "#EFE6DE",
  },
  steel: {
    primary: "#58849D",
    secondary: "#D7F0FF",
  },
  ghost: {
    primary: "#6278F7",
    secondary: "#E1E6FF",
  },
  dragon: {
    primary: "#5CB1FF",
    secondary: "#D2EAFF",
  },
};

export default typeColorMap;

export function getColorByType(type) {
  const color = typeColorMap[type];
  if (color) {
    return color;
  }
  console.warn(`Type not mapped: ${type}`);

  return { primary: "#5CB1FF", secondary: "#D2EAFF" };
}
