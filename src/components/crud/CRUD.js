import React, { useState } from 'react';
import { Route, BrowserRouter, Routes, Switch } from "react-router-dom";
import Read from './Read';
import Delete from './Delete';
import CreateAndEdit from './CreateAndEdit'

export default function CRUD(p) {
  const [create, setCreate] = useState(false);

  return (
    <div>
      {/* {create ? <Read parametros={p.parametros} /> : <CreateAndEdit/>} */}
      <Read parametros={p.parametros} />
    </div>
  );
}
