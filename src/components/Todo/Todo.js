import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { IoTodayOutline } from "react-icons/io5";
import { TiInputChecked } from "react-icons/ti";
import { FcTodoList } from "react-icons/fc";

export const TodoComponent = () => {
  const [datas, setDatas] = useState(JSON.parse(window.localStorage.getItem("todo")) || []);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // ------> Add Todo
  const handleSubmit = (e) => {
    e.preventDefault();

    const newObject = {
      id: Math.floor(Math.random() * 10000),
      name: name,
      number: number,
      complate: false,
    };

    setDatas([...datas, newObject]);
    e.target.reset();
  };

  // ------> SetItem Localstorge
  if (datas.length > 0) {
    window.localStorage.setItem("todo", JSON.stringify(datas));
  } else {
    window.localStorage.removeItem("todo");
  }

  // -------> Delete Todo
  const DeleteTodo = (id) => {
    const newList = datas.filter((item) => item.id !== id);
    setDatas(newList);
  };

  // -------> Edit Todo
  const EditTodo = (id) => {
    const newList = datas.find((item) => item.id === id);
    const changeValue = prompt("", newList.name);
    newList.name = changeValue;
    setDatas([...datas]);
  };

  // -------> Complate Todo
  const ComplateTodo = (id) => {
    setDatas(
      datas.map((item) => {
        if (item.id === id) {
          return { ...item, complate: !item.complate };
        }
        return item;
      })
    );
  };

  return (
    <div className="container !mb-10">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form flex flex-col justify-center items-center space-y-3 mt-5 px-2 py-5 rounded-lg max-w-[500px] w-full h-[300px] mx-auto border-2 bg-neutral-200"
      >
        <h2 className="flex items-center space-x-5 font-bold text-[#FDF6B2] text-xl">
          <IoTodayOutline className="mr-2 text-white" />
          Day Plans
        </h2>
        <label
          className="font-medium text-[#FDF6B2] text-start flex flex-col w-[80%]"
          htmlFor="name"
        >
          Plan
          <input
            id="name"
            required
            type="text"
            placeholder="Enter your plan"
            onChange={(e) => setName(e.target.value.trim())}
            className="w-full py-2 px-3 rounded-md border outline-offset-2 outline-[#0B84EE] font-normal text-sm text-black"
          />
        </label>
        <label
          className="font-medium text-[#FDF6B2] text-start flex flex-col w-[80%]"
          htmlFor="name"
        >
          Plan's number
          <input
            id="name"
            required
            type="number"
            placeholder="Enter your plane number"
            onChange={(e) => setNumber(e.target.value.trim())}
            className="w-full py-2 px-3 rounded-md border outline-offset-2 outline-[#0B84EE] font-normal text-sm text-black"
          />
        </label>
        <button
          className="flex items-center border rounded-md py-1 px-3 !mt-5 w-fit bg-[#ffffff] hover:bg-[#FACA15] hover:text-white duration-200 hover:border-gray-500"
          type="submit"
        >
          <span className="block mr-2 hover:text-white">
            <FcTodoList />
          </span>
          Add todo
        </button>
      </form>
      {/* ---------------------------------------- */}
      <ul className="space-y-5 mt-5 flex flex-col max-w-[700px] w-full mx-auto justify-center">
        {datas.length > 0 &&
          datas
            .sort((a, b) => (+a.number > +b.number ? 1 : +a.number < +b.number ? -1 : 1))
            .map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-start border rounded-md px-2 md:px-5 py-2"
              >
                <div className="w-[60%] flex flex-col flex-wrap">
                  <p className="break-all text-red-500 font-semibold">
                    <span className="font-semibold text-black">Plan's nomer: - </span>{" "}
                    {item?.number}
                  </p>
                  <p
                    className={`break-all text-base font-thin ${
                      item.complate ? "line-through" : ""
                    }`}
                  >
                    {item?.name}
                  </p>
                </div>
                <div className="flex items-center justify-end w-[35%]">
                  <button
                    onClick={() => ComplateTodo(item.id)}
                    className="px-2 md:px-3 py-[6px] md:py-2 rounded mr-2 border-2 hover:bg-[#3F83F8] hover:border-[#3F83F8] focus:bg-[#3F83F8] focus:border-[#3F83F8] focus:text-white duration-100 group"
                  >
                    <TiInputChecked className="group-hover:text-white" />
                  </button>
                  <button
                    onClick={() => EditTodo(item.id)}
                    className="px-2 md:px-3 py-[6px] md:py-2 rounded mr-2 border-2 hover:bg-[#9CA3AF] hover:border-[#9CA3AF] duration-100 group"
                  >
                    <FiEdit className="group-hover:text-white" />
                  </button>
                  <button
                    onClick={() => DeleteTodo(item.id)}
                    className="px-2 md:px-3 py-[6px] md:py-2 rounded border-2 hover:bg-[#E02424] hover:border-[#C81E1E] duration-100 group"
                  >
                    <AiFillDelete className="group-hover:text-white" />
                  </button>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};
