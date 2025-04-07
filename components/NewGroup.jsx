"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const NewGroup = ({ setVisibility, pollId, getGroups }) => {
    const ref = useRef();
    const [formData, setFormData] = useState({
        pollId,
        min_stdid: "",
        max_stdid: "",
        point: 0,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ref.current.focus();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(
                `https://pollportal-server.onrender.com/poll/${pollId}/add-group`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            if (response.status == 200) {
                toast.success("Group created successfully", {
                    theme: "colored",
                    hideProgressBar: true,
                });
                setVisibility(false);
                getGroups();
            } else if (response.status == 400) {
                toast.error("You can't create group once poll is started", {
                    theme: "colored",
                    hideProgressBar: true,
                });
                setVisibility(false);
            } else {
                toast.error("Group creation failed", {
                    theme: "colored",
                    hideProgressBar: true,
                });
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            toast.error("Server Error", {
                theme: "colored",
                hideProgressBar: true,
            });
            setLoading(false);
        }
    };
    return (
        <div className="flex w-3/4 md:w-1/2 flex-col p-10 bg-slate-100 rounded-lg">
            <div className="text-4xl font-bold text-sky-700">Create Group</div>
            <form onSubmit={handleSubmit} className="flex flex-col mt-10 gap-5">
                <div className="flex gap-2">
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs font-bold">
                            Start Student ID
                        </label>
                        <input
                            className="p-1 border-2 border-slate-200 focus:border-sky-500 rounded-sm outline-none bg-slate-200"
                            type="text"
                            name="min_stdid"
                            value={formData.min_stdid}
                            onChange={handleChange}
                            required
                            ref={ref}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs font-bold">
                            End Student ID
                        </label>
                        <input
                            className="p-1 border-2 border-slate-200 focus:border-sky-500 rounded-sm outline-none bg-slate-200"
                            type="text"
                            name="max_stdid"
                            value={formData.max_stdid}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-bold">Point</label>
                    <input
                        className="p-1 border-2 border-slate-200 focus:border-sky-500 rounded-sm outline-none bg-slate-200"
                        type="number"
                        name="point"
                        value={formData.point}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex w-full gap-2">
                    <button
                        className="bg-slate-300 p-2 hover:bg-slate-400 cursor-pointer rounded-sm w-full"
                        type="button"
                        onClick={() => setVisibility(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-sky-600 p-2 hover:bg-sky-700 cursor-pointer rounded-sm text-white w-full"
                        type="submit"
                        disabled={loading}
                    >
                        Create Group
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewGroup;
