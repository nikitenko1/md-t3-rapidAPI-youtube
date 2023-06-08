import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { youtubeAutoComplete } from "../lib/axios";
import { GoSearch } from "react-icons/go";
import { v4 } from "uuid";
import useDebounce from "hooks/useDebounce";
import useOutsideClick from "hooks/useOutsideClick";
import useMediaQuery from "hooks/useMediaQuery";

const Search = () => {
  const [focus, setFocus] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [term, setTerm] = useState<string>("");
  const router = useRouter();

  const [openAutocomplete, setOpenAutocomplete] = useState<boolean>(true);

  // Easily retrieve media dimensions with this Hook React which also works onResize.
  const matches = useMediaQuery("(min-width: 500px)");
  // This React hook helps to limit that the component is re-rendered too many times
  const debouncedSearch = useDebounce(term, 500);
  const ref = useRef(null);
  // React hook for listening for clicks outside of a specified element (see useRef)
  useOutsideClick(ref, () => {
    setOpenAutocomplete(false);
  });

  // url: 'https://youtube138.p.rapidapi.com/search/',
  // params: {
  //   q: 'despacito',
  //   hl: 'en',
  //   gl: 'US'
  // },
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await youtubeAutoComplete.get(`?q=${debouncedSearch}`);
        // const data = await response.json();
        setData(response.data);
        console.log(data);
      } catch (err: any) {
        console.log(err);
      }
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <div className={`${matches ? "w-1/2" : "w-full"} relative`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpenAutocomplete(false);

          router.push(`/search?results=${term}`);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`relative flex items-center gap-x-2 border px-2 ${
          focus ? "border-blue-500" : "border-gray-500"
        }`}
      >
        {focus && <GoSearch className="text-white" />}
        <input
          onClick={() => setOpenAutocomplete(true)}
          onChange={(e) => setTerm(e.target.value)}
          type="search"
          placeholder="Search"
          value={term}
          className="w-full bg-transparent px-1 py-2 text-white outline-none"
        />
        <button
          className="absolute right-0 h-full bg-gray-500 px-4 py-2"
          type="submit"
        >
          <GoSearch className="text-white" />
        </button>
      </form>
      {openAutocomplete && (
        <>
          {debouncedSearch && data && (
            <div className="absolute top-full w-full bg-white py-2" ref={ref}>
              {data?.results.map((item: string) => (
                <div
                  key={v4()}
                  onClick={() => setTerm(item)}
                  className="flex cursor-pointer items-center gap-x-2 px-2 py-1 hover:bg-gray-100"
                >
                  <GoSearch />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
