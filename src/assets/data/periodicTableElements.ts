const elements = [
  "Ac",
  "Al",
  "Am",
  "Sb",
  "Ar",
  "As",
  "At",
  "Ba",
  "Bk",
  "Be",
  "Bi",
  "Bh",
  "B",
  "Br",
  "Cd",
  "Ca",
  "Cf",
  "C",
  "Ce",
  "Cs",
  "Cl",
  "Cr",
  "Co",
  "Cn",
  "Cu",
  "Cm",
  "Ds",
  "Db",
  "Dy",
  "Es",
  "Er",
  "Eu",
  "Fm",
  "Fl",
  "F",
  "Fr",
  "Gd",
  "Ga",
  "Ge",
  "Au",
  "Hf",
  "Hs",
  "He",
  "Ho",
  "H",
  "In",
  "I",
  "Ir",
  "Fe",
  "Kr",
  "La",
  "Lr",
  "Pb",
  "Li",
  "Lv",
  "Lu",
  "Mg",
  "Mn",
  "Mt",
  "Md",
  "Hg",
  "Mo",
  "Mc",
  "Nd",
  "Ne",
  "Np",
  "Ni",
  "Nh",
  "Nb",
  "N",
  "No",
  "Og",
  "Os",
  "O",
  "Pd",
  "P",
  "Pt",
  "Pu",
  "Po",
  "K",
  "Pr",
  "Pm",
  "Pa",
  "Ra",
  "Rn",
  "Re",
  "Rh",
  "Rg",
  "Rb",
  "Ru",
  "Rf",
  "Sm",
  "Sc",
  "Sg",
  "Se",
  "Si",
  "Ag",
  "Na",
  "Sr",
  "S",
  "Ta",
  "Tc",
  "Te",
  "Ts",
  "Tb",
  "Tl",
  "Th",
  "Tm",
  "Sn",
  "Ti",
  "W",
  "U",
  "V",
  "Xe",
  "Yb",
  "Y",
  "Zn",
  "Zr",
];

type Index = { [key: string]: string };
type ElementIndex = { [key: string]: Index };

export const buildElementIndex = () => {
  return elements.reduce((index, el) => {
    const element = el.toLocaleLowerCase();
    if (element.length === 1)
      return (
        index[element]
          ? {
              ...index,
              [element]: { ...index[element], _: true },
            }
          : { ...index, [element]: { _: true } }
      ) as ElementIndex;

    const [first, second] = element.split("");
    return (
      index[first]
        ? {
            ...index,
            [first]: { ...index[first], [second]: true },
          }
        : { ...index, [first]: { [second]: true } }
    ) as ElementIndex;
  }, {} as ElementIndex);
};

export default elements;
