import { ChangeEvent, FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BigHead } from "@bigheads/core";

import Button from "../../components/Button";
import Input from "../../components/Input";
import PageTitle from "../../components/PageTitle";
import Textarea from "../../components/Textarea";
import { updateUser, useUser } from "../../context/UserContext";
import { FakeUser } from "../../context/FakeAuthContext";
import { MARION } from "../../utils/avatar";

import "./ContextModuleFunctions.scss";

const ContextModuleFunctions = () => {
  const [{ user, status, error }, userDispatch] = useUser();
  const [formData, setFormData] = useState<FakeUser>({
    userId: "user#69420",
    nickname: "",
    bio: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateUser(userDispatch, user, formData).catch(() => {});
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    setFormData(user);
    userDispatch({ type: "RESET" });
  };

  const avatar = user?.avatar
    ? { ...user.avatar.accessories, ...user.avatar.baseTraits }
    : MARION;

  const pending = status === "pending";
  const changed =
    formData.nickname !== user.nickname || formData.bio !== user.bio;

  return (
    <div className="cmf">
      <PageTitle title="Context Module Functions" />

      <form onSubmit={handleSubmit}>
        <h4>(User Update Form)</h4>
        <div className="cmf__identity">
          <Input label="User ID" value={`${formData.userId}`} disabled />
          <Input
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            label="Nickname*"
            placeholder="Nickname*"
            required
          />
        </div>
        <Textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          label="Biography"
          placeholder="Tell us more about yourself in less than 140 characters"
        />
        <div className="cmf__actions">
          <Button
            buttonStyle="hollow"
            disabled={!formData.nickname || pending}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button disabled={!changed || !formData.nickname || pending}>
            {pending ? (
              "Please wait"
            ) : error ? (
              <>
                <FontAwesomeIcon icon={faXmark} />
                Try again
              </>
            ) : formData.nickname ? (
              "Submit"
            ) : (
              <>
                <FontAwesomeIcon icon={faCheck} />
                Success
              </>
            )}
          </Button>
        </div>
        {error && <div className="cmf__error">Error! {error}</div>}
      </form>

      <section className="cmf__avatar">
        <BigHead {...avatar} faceMask={false} mask={false} />
        <div className="cmf__avatar__infos">
          <label>{user?.nickname || "Unnamed"}</label>
          <label>{user?.bio || "No biography provided"}</label>
          <label>({user?.userId || "user#69420"})</label>
        </div>
      </section>
    </div>
  );
};

export default ContextModuleFunctions;
