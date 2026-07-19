import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";
import Pagination from "../components/common/Pagination";

import SchemeCard from "../components/schemes/SchemeCard";
import SchemeFilter from "../components/schemes/SchemeFilter";
import EmptyScheme from "../components/schemes/EmptyScheme";

import { getSchemes } from "../services/schemeService";

const Schemes = () => {
  const [loading, setLoading] = useState(true);

  const [schemes, setSchemes] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [schemeType, setSchemeType] = useState("");
  const [government, setGovernment] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    loadSchemes();
  }, [page, search, schemeType, government, sort]);

  const loadSchemes = async () => {
    setLoading(true);

    try {
      const res = await getSchemes({
        page,
        limit: 9,
        search,
        schemeType,
        government,
        sort,
      });

      setSchemes(res.schemes || []);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load schemes.");
    } finally {
      setLoading(false);
    }
  };

  // Reset to first page whenever filters change
  useEffect(() => {
    setPage(1);
  }, [search, schemeType, government, sort]);

  if (loading) {
    return <Loader text="Loading Schemes..." />;
  }

  return (
    <MainLayout>
      <PageHeader
        title="Government Schemes"
        subtitle="Browse all available government schemes."
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

      <div className="flex justify-between items-center mt-8 mb-5">
        <h2 className="text-2xl font-bold">Available Schemes</h2>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
          {schemes.length} Schemes
        </span>
      </div>

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
    </MainLayout>
  );
};

export default Schemes;
