import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Route, Routes, Outlet, useNavigate, useLocation
} from "react-router-dom";
import { Card, Heading, Layout, Select } from "@stellar/design-system";

import { SendPayment } from "@modules/payment-react/src/components/send-payment";
import { MintToken } from "@modules/mint-token/src/components/mint-tokens";

import "@stellar/design-system/build/styles.min.css";
import "./index.scss";

const DEMOS = ["mint-token", "payment"];

const OutletLayout = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const getActiveTab = (path: string) => {
    switch (true) {
      case path.includes("payment"):
        return "payment"
      default:
      case path.includes("mint-token"):
        return "mint-token"
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case "payment":
        return nav("/payment", { replace: true });
      case "mint-token":
        return nav("/", { replace: true });
      default:
        return nav("/", { replace: true });
    }
  };

  return (
    <>
      <Layout.Header hasThemeSwitch projectId="scaffold-soroban-demo-picker" />
      <div className="Layout__inset layout">
        <div className="title-row">
          <Heading as="h1" size="lg" className="demo-title">
            Choose a Soroban Demo
          </Heading>
          <div className="demo-selector">
            <Select
              id="demo-selector"
              label="Select demo"
              fieldSize="sm"
              onChange={handleChange}
              value={getActiveTab(pathname)}
            >
              {DEMOS.map((demo) => (
                <option key={demo} value={demo}>
                  {demo}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="demo-row">
          <Card borderRadiusSize="sm" variant="secondary">
            <Outlet />
          </Card>
        </div>
      </div>
    </>
  )
}

const Main = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<OutletLayout />}>
        <Route index element={<MintToken hasHeader={false} />} />
        <Route path="/payment" element={<SendPayment hasHeader={false} />} />
      </Route>
    </Routes>
  </BrowserRouter>
)


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Main />);
