import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";

import SchemeCard from "../components/schemes/SchemeCard";
import SchemeFilter from "../components/schemes/SchemeFilter";
import EmptyScheme from "../components/schemes/EmptyScheme";
import Pagination from "../components/common/Pagination";
import { getSchemes } from "../services/schemeService";

const Schemes = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const [schemes, setSchemes] = useState([]);

  const [search, setSearch] = useState("");

  const [schemeType, setSchemeType] = useState("");

  const [government, setGovernment] = useState("");

  useEffect(() => {
    fetchSchemes();
  }, []);
  useEffect(() => {
    loadSchemes();
  }, [page]);

  const loadSchemes = async () => {
    setLoading(true);

    try {
      const res = await getSchemes(page);

      setSchemes(res.schemes);

      setTotalPages(res.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchemes = async () => {
    try {
      const res = await getSchemes();

      setSchemes(res.schemes || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load schemes.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchSearch =
        scheme.title.toLowerCase().includes(search.toLowerCase()) ||
        scheme.description.toLowerCase().includes(search.toLowerCase());

      const matchType = schemeType === "" || scheme.schemeType === schemeType;

      const matchGovernment =
        government === "" || scheme.government === government;

      return matchSearch && matchType && matchGovernment;
    });
  }, [schemes, search, schemeType, government]);

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
      />

      <div className="flex justify-between items-center mt-8 mb-5">
        <h2 className="text-2xl font-bold">Available Schemes</h2>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
          {filteredSchemes.length} Schemes
        </span>
      </div>

      {filteredSchemes.length === 0 ? (
        <EmptyScheme />
      ) : (
        <div>
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
        </div>
      )}
    </MainLayout>
  );
};

export default Schemes;
