"use client";

import { useState } from "react";

export default function ExpiryInput({
    name,
    _defaultValue
} : { name: string, _defaultValue?: object }) {
    const [validityType, setValidityType] = useState<string>("neverExpires")
    const validities = [
        ["neverExpires", "It will never expire"],
        ["dateRange", "In a specific date range"],
        ["specifiedPeriod", "After a given period of time"]
    ]

    return (
        <fieldset>
            <div className="flex flex-col">
                {validities.map(i => {
                    const [value, label] = i
                    const id = `${name}_${value}`

                    return (
                        <div key={id} className="flex items-center gap-3 py-3 pr-3">
                            <input className="w-5 h-5" type="radio" name={`${name}_type`} id={id} value={value} onChange={() => setValidityType(value!)} defaultChecked={validityType === value} />
                            <label htmlFor={id} className="font-medium">{label}</label>
                        </div>
                    )
                })}

                {validityType === "dateRange" && (
                    <div className="flex gap-5 mt-5">
                        <div className="field">
                            <label htmlFor={`${name}_valid_from`}>From</label>
                            <input className="w-[21.8rem]" name={`${name}_valid_from`} type="date" />
                        </div>
                        <div className="field">
                            <label htmlFor={`${name}_valid_to`}>To</label>
                            <input className="w-[21.8rem]" name={`${name}_valid_to`} type="date" />
                        </div>
                    </div>
                )}

                {validityType === "specifiedPeriod" && (
                    <div className="field mt-5">
                        <label htmlFor={`${name}_duration`}>Expire After</label>
                        <div className="relative max-w-max">
                            <input className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" min={1} type="number" />
                            <select className="absolute top-1/2 right-0 transform translate-y-1/2" defaultValue="months">
                                <option value="years">Years</option>
                                <option value="months">Months</option>
                                <option value="weeks">Weeks</option>
                                <option value="days">Days</option>
                                <option value="hours">Hours</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </fieldset>
    )
}