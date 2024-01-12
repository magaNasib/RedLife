import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Donor {
  id: number;
  imageUrl: string;
  heading: string;
  description: string;
  quantityOfBlood: number;
}

const donors = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    heading: "Heading1",
    description: "Some text1 .....",
    quantityOfBlood: 3,
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    heading: "Heading2",
    description: "Some text2 .....",
    quantityOfBlood: 5,
  },
];

const DonorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [donor, setDonor] = useState<Donor | null>(null);

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        const response = await fetch(
          `https://mocki.io/v1/c53fd2b2-fae4-4552-9ea2-8fe1b112b483/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch donor details");
        }

        const donorDetails: Donor = await response.json();
        setDonor(donorDetails);
      } catch (error) {
        console.error("Error fetching donor details:", error);
      }
    };

    fetchDonorDetails();
  }, [id]);

  return (
    <div>
      {donor ? (
        <>
          <h2>Donor Details for ID: {id}</h2>
          <img src={donor.imageUrl} alt="Donor Avatar" />
          <h3>{donor.heading}</h3>
          <p>{donor.description}</p>
          <p>Quantity of Blood: {donor.quantityOfBlood}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DonorDetails;
