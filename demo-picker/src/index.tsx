import * as React from 'react';
import ReactDOM from 'react-dom/client';

import { DemoPicker } from 'demo-picker';

import "@stellar/design-system/build/styles.min.css";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<DemoPicker />);
