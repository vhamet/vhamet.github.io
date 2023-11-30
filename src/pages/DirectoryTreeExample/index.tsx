import DirectoryTree, {
  DirectoryTreeNode,
} from "../../components/DirectoryTree";

import "./DirectoryTreeExample.scss";

const DIRECTORY_TREE: DirectoryTreeNode = {
  name: "src",
  children: [
    {
      name: "components",
      children: [
        {
          name: "Button",
          children: [{ name: "index.tsx" }, { name: "Button.scss" }],
        },
        {
          name: "Input",
          children: [{ name: "index.tsx" }, { name: "Input.scss" }],
        },
        {
          name: "Loader",
          children: [{ name: "index.tsx" }, { name: "Loader.scss" }],
        },
      ],
    },
    {
      name: "pages",
      children: [
        { name: "Home", children: [{ name: "index.tsx" }] },
        {
          name: "MemoryGame",
          children: [{ name: "index.tsx" }, { name: "MemoryGame.scss" }],
        },
        {
          name: "Pokemon",
          children: [{ name: "index.tsx" }, { name: "Pokemon.scss" }],
        },
        {
          name: "RickMorty",
          children: [{ name: "index.tsx" }, { name: "RickMorty.scss" }],
        },
        {
          name: "BreakingBad",
          children: [{ name: "index.tsx" }, { name: "BreakingBad.scss" }],
        },
      ],
    },
    {
      name: "utils",
      children: [
        { name: "api.ts" },
        { name: "array.ts" },
        { name: "localStorage.ts" },
        { name: "rickmorty.ts" },
      ],
    },
    { name: "hooks", children: [] },
  ],
};

const DirectoryTreeExample = () => (
  <div className="directory-tree-example">
    <DirectoryTree tree={DIRECTORY_TREE} />
  </div>
);

export default DirectoryTreeExample;
