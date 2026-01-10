import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import OverviewPage from "./OverviewPage/OverviewPage";
import data from "./data/data.json";
import PotsPage from "./PotsPage/PotsPage";
import BudgetsPage from "./BudgetsPage/BudgetsPage";
import RecurringPage from "./RecurringPage/RecurringPage";
import TransactionsPage from "./TransactionsPage/TransactionsPage";

import "./App.css";
import NavBar from "./NavBar/NavBar";
import { MobileContext } from "./context";

export type DataPots = {
  name: string;
  target: number;
  total: number;
  theme: string;
}[];

export type DataBudgets = {
  category: string;
  maximum: number;
  theme: string;
}[];

export default function App() {
  const [potsState, setPotsState] = useState<DataPots>(data.pots);
  const [budgetState, setBudgetState] = useState<DataBudgets>(data.budgets);
  const [isMobileWidth, setIsMobileWidth] = useState(window.innerWidth <= 767);

  useEffect(() => {
    function onWindowResize(): void {
      if (window.innerWidth <= 767) {
        setIsMobileWidth(true);
      } else {
        setIsMobileWidth(false);
      }
    }

    window.addEventListener("resize", onWindowResize);
    onWindowResize();
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  const AppLayout = () => (
    <>
      <NavBar />
      <Outlet />
    </>
  );

  const router = createBrowserRouter([
    {
      // eslint-disable-next-line react-hooks/static-components
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <OverviewPage
              potsState={potsState}
              setPotsState={setPotsState}
              budgetState={budgetState}
              setBudgetState={setBudgetState}
            />
          ),
        },
        {
          path: "/pots",
          element: (
            <PotsPage potsState={potsState} setPotsState={setPotsState} />
          ),
        },
        {
          path: "/budgets",
          element: (
            <BudgetsPage
              budgetState={budgetState}
              setBudgetState={setBudgetState}
            />
          ),
        },
        {
          path: "/recurring-bills",
          element: <RecurringPage />,
        },
        {
          path: "/transactions",
          element: <TransactionsPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <MobileContext.Provider value={isMobileWidth}>
        <RouterProvider router={router} />
      </MobileContext.Provider>
    </>
  );
}
