import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <>
      <ul>
        <li>Dashboard</li>
        <li>
          <button className="bg-black text-white">
            <Link to="/product">Product</Link>
          </button>
        </li>
        <li>
          <button className="bg-black text-white">
            <Link to="/profile  ">Profile</Link>
          </button>
        </li>
      </ul>
    </>
  );
}
