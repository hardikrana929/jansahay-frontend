import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";
import SchemeDetailsCard from "../components/schemes/SchemeDetailsCard";

import { getSchemeById } from "../services/schemeService";

const SchemeDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [scheme, setScheme] = useState(null);

  useEffect(() => {
    fetchScheme();
  }, [id]);

  const fetchScheme = async () => {
    try {
      const res = await getSchemeById(id);

      // Handles either { scheme: {...} } or the object itself
      setScheme(res.scheme || res);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load scheme.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Scheme..." />;
  }

  if (!scheme) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h2 className="text-2xl font-bold text-red-600">Scheme not found</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Scheme Details"
        subtitle="Complete information about this government scheme."
      />

      <SchemeDetailsCard scheme={scheme} />
    </MainLayout>
  );
};

export default SchemeDetails;
