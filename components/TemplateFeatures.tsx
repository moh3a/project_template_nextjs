import { useTheme } from "next-themes";

const TemplateFeatures = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <h2 className="text-xl font-bold">
        Configured with{" "}
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-white">Tailwind</span>
        </span>{" "}
        CSS
      </h2>
      <p>
        a utility-first CSS framework that can be composed to build any design..
        with dark mode{" "}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="inline px-2 py-1 -skew-y-2 font-semibold text-white bg-pink-500"
        >
          toggle
        </button>{" "}
        support
      </p>
      <h2 className="text-xl font-bold">This app is a PWA</h2>
      <p>
        it means that althogh it is on the web, it can be installed on your
        windows or your android.
      </p>
    </>
  );
};

export default TemplateFeatures;
