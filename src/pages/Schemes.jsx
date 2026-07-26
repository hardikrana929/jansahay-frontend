import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useDebounce from "../hooks/Usedebounce";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";
import Pagination from "../components/common/Pagination";

import SchemeCard from "../components/schemes/SchemeCard";
import SchemeFilter from "../components/schemes/SchemeFilter";
import EmptyScheme from "../components/schemes/EmptyScheme";

import { getSchemes } from "../services/schemeService";

const Schemes = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const isFirstLoad = useRef(true);

  const [schemes, setSchemes] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [schemeType, setSchemeType] = useState("");
  const [government, setGovernment] = useState("");
  const [sort, setSort] = useState("latest");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    loadSchemes();
  }, [page, debouncedSearch, schemeType, government, sort]);

  const loadSchemes = async () => {
    if (isFirstLoad.current) {
      setLoading(true);
    } else {
      setFetching(true);
    }

    try {
      const res = await getSchemes({
        page,
        limit: 9,
        search: debouncedSearch,
        schemeType,
        government,
        sort,
      });

      setSchemes(res.schemes || []);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      toast.error(error.response?.data?.message || t("schemes.unableToLoad"));
    } finally {
      setLoading(false);
      setFetching(false);
      isFirstLoad.current = false;
    }
  };

  // Reset to first page whenever filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, schemeType, government, sort]);

  if (loading) {
    return <Loader text={t("common.loadingSchemes")} />;
  }

  return (
    <>
      <MainLayout>
        <PageHeader
          title={t("schemes.title")}
          subtitle={t("schemes.subtitle")}
        />

        <SchemeFilter
          search={search}
          setSearch={setSearch}
          schemeType={schemeType}
          setSchemeType={setSchemeType}
          government={government}
          setGovernment={setGovernment}
          sort={sort}
          setSort={setSort}
        />

        <div className="flex flex-wrap gap-3 justify-between items-center mt-8 mb-5">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {t("schemes.available")}
          </h2>

          <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
            {t("schemes.count", { count: schemes.length })}
          </span>
        </div>

        <div
          className={`transition-opacity duration-200 ${
            fetching ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          {schemes.length === 0 ? (
            <EmptyScheme />
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schemes.map((scheme) => (
                  <SchemeCard key={scheme._id} scheme={scheme} />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Schemes;
