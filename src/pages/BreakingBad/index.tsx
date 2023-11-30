import { FormEvent, useState } from "react";

import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { buildElementIndex } from "../../assets/data/periodicTableElements";

import "./BreakingBad.scss";

type Name = {
  firstname: string;
  lastname: string;
};

type BreakifiedName = {
  firstname: JSX.Element | null;
  lastname: JSX.Element | null;
};

type BreakifiedNameProps = {
  start?: string;
  breakified?: string;
  end?: string;
};
const BreakifiedName = ({ start, breakified, end }: BreakifiedNameProps) => (
  <label>
    {start}
    <label className="breakified">{breakified}</label>
    {end}
  </label>
);

const elementIndex = buildElementIndex();
const breakify = (name: string) => {
  let i;
  for (i = 0; i < name.length; i++) {
    const currentLetter = name[i];
    const keyCurrentLetter = currentLetter.toLocaleLowerCase();
    if (elementIndex[keyCurrentLetter]) {
      const nextLetter = i < name.length - 1 && name[i + 1];
      let breakifiable = "";
      if (
        nextLetter &&
        elementIndex[keyCurrentLetter][nextLetter.toLocaleLowerCase()]
      )
        breakifiable = currentLetter + nextLetter;
      else if (elementIndex[keyCurrentLetter]._) breakifiable = currentLetter;

      if (breakifiable)
        return (
          <BreakifiedName
            start={name.substring(0, i)}
            breakified={breakifiable}
            end={name.substring(i + breakifiable.length)}
          />
        );
    }
  }

  return <label>{name}</label>;
};

const BreakingBad = () => {
  const [name, setName] = useState<Name>({
    firstname: "Breaking",
    lastname: "Bad",
  });
  const [breakified, setBreakified] = useState<BreakifiedName>({
    firstname: <BreakifiedName breakified="Br" end="aking" />,
    lastname: <BreakifiedName breakified="Ba" end="d" />,
  });

  const handleBreakify = (event: FormEvent) => {
    event.preventDefault();

    const breakifiedFirstname = breakify(name.firstname);
    const breakifiedLastname = breakify(name.lastname);

    setBreakified({
      firstname: breakifiedFirstname,
      lastname: breakifiedLastname,
    });
  };

  return (
    <div className="breakingbad">
      <PageTitle title="Breaking Bad" />

      <section className="breakingbad__title">
        <div>{breakified.firstname || name.firstname}</div>
        <div>{breakified.lastname || name.lastname}</div>
      </section>
      <form className="breakingbad__form" onSubmit={handleBreakify}>
        <div className="breakingbad__inputs">
          <Input
            label="First Name"
            value={name.firstname}
            onChange={(event) =>
              setName({ ...name, firstname: event.target.value })
            }
          />
          <Input
            label="Last Name"
            value={name.lastname}
            onChange={(event) =>
              setName({ ...name, lastname: event.target.value })
            }
          />
        </div>
        <Button classnames="breakingbad__button">Breakify</Button>
      </form>
    </div>
  );
};

export default BreakingBad;
