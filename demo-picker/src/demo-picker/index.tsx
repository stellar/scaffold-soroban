import React from "react"
import { Card, Heading, Layout, Select } from "@stellar/design-system"

import "./index.scss"

const DEMOS = [
  "payment",
  "mint-token"
]

function DemoPicker() {
  const [activeDemo, setActiveDemo] = React.useState(DEMOS[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveDemo(event.target.value);
  };

  function renderActiveDemo(demo: string) {
    switch (demo) {
      default:
        // render selected demo once they are available
        return <div />
        // throw new Error(`Demo not implemented: ${demo}`)
    }
  }

  return (
    <>
      <Layout.Header hasThemeSwitch projectId="scaffold-soroban-demo-picker" />
      <div className="layout">
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
            >
              {DEMOS.map(demo => (
                <option value={demo}>{demo}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="demo-row">
          <Card borderRadiusSize="sm" variant="secondary">
            {renderActiveDemo(activeDemo)}
          </Card>
        </div>
      </div>
    </>
  )
}

export { DemoPicker }