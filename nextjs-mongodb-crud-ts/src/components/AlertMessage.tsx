"use client";
import { useAlertStore } from '@/hooks/alert-store';
import clsx from 'clsx';
import React from 'react'

export const AlertMessage = () => {

    const { show, message, alertType } = useAlertStore();

    return (
        <div className={clsx("alert",
            alertType === "danger" ? "alert-danger" : "alert-success",
            show && "show")}>
            <p>{message}</p>
        </div>
    )
}