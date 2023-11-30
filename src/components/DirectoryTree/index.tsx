import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFolderOpen,
  faFolderClosed,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

import "./DirectoryTree.scss";

export type DirectoryTreeNode = {
  name: string;
  children?: DirectoryTreeNode[];
};

type DTFileProps = {
  file: DirectoryTreeNode;
};
const DTFile = ({ file }: DTFileProps) => (
  <div className="directory-tree__file">
    {<FontAwesomeIcon icon={faFile} />}
    {file.name}
  </div>
);

type DTFolderProps = {
  folder: DirectoryTreeNode;
};
const DTFolder = ({ folder }: DTFolderProps) => {
  const [expandedFolder, setExpandedFolder] = useState(false);
  const toggleFolderContent = () => setExpandedFolder(!expandedFolder);

  const hasChildren = !!folder.children?.length;
  let icon = faFolderClosed;
  if (hasChildren) icon = expandedFolder ? faFolderOpen : faFolder;

  return (
    <div className="directory-tree__folder">
      <div
        className={`directory-tree__folder__title${
          hasChildren ? " clickable" : ""
        }`}
        onClick={() => hasChildren && toggleFolderContent()}
      >
        {<FontAwesomeIcon icon={icon} />}
        {folder.name}
      </div>

      {hasChildren && (
        <div
          className={`directory-tree__folder__content${
            expandedFolder ? " expanded" : ""
          }`}
        >
          {folder.children!.map((child, id) =>
            child.children ? (
              <DTFolder key={id} folder={child} />
            ) : (
              <DTFile key={id} file={child} />
            )
          )}
        </div>
      )}
    </div>
  );
};

type DirectoryTreeProps = {
  tree: DirectoryTreeNode;
};

const DirectoryTree = ({ tree }: DirectoryTreeProps) => {
  return (
    <div className="directory-tree">
      {tree.children ? <DTFolder folder={tree} /> : <DTFile file={tree} />}
    </div>
  );
};

export default DirectoryTree;
