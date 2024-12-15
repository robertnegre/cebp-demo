/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim
* Coded by www.creative-tim.com
 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Transactions from "layouts/dashboard/components/Projects/index3";
import { Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function MyTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}/transactions`);
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions");
      }
    };

    if (userId) {
      fetchTransactions();
    } else {
      setError("No userId found in localStorage");
    }
  }, [userId]);

  return (
    <>
      {error && (
        <DashboardLayout>
          <MDBox py={3}>
            <MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={12}>
                  <MDTypography variant="button" color="error" p={2}>
                    {error}
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </DashboardLayout>
      )}
      {!error && transactions.length === 0 && (
        <DashboardLayout>
          <MDBox py={3}>
            <MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={12}>
                  <MDTypography variant="button" color="text" p={2}>
                    No transactions found.
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </DashboardLayout>
      )}
      {transactions.length > 0 && (
        <DashboardLayout>
          <MDBox py={3}>
            <MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={12}>
                  <Transactions />
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </DashboardLayout>
      )}
    </>
  );
}

export default MyTransactions;