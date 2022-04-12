import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const languages = [
  {
    name: "English",
    locale: "en",
  },
  {
    name: "Français",
    locale: "fr",
  },
  {
    name: "عربية",
    locale: "ar",
  },
];

const SelectLocale = () => {
  const router = useRouter();
  let lang = "";
  if (router.locale === "fr") {
    lang = languages[1].name;
  } else if (router.locale === "ar") {
    lang = languages[2].name;
  } else {
    lang = languages[0].name;
  }
  const [selected, setSelected] = useState(lang);

  return (
    <div>
      <h2>It has locale (Internationalization) configured.</h2>
      {languages.map((language, idx) => (
        <Fragment key={idx}>
          <Link href={router.asPath} locale={language.locale} passHref>
            <div onClick={() => setSelected(language.name)}>
              <input
                type="radio"
                value={language.locale}
                onChange={() => console.log(language.name)}
                checked={language.name === selected}
                name="locale"
              />
              <label>{language.name}</label>
            </div>
          </Link>
        </Fragment>
      ))}
    </div>
  );
};

export default SelectLocale;
