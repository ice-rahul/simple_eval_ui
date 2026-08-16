"use client"
import React from 'react'
import { cx } from "tailwind-variants"
import { TabNames } from './types';

type TabsProps = {
	tabNames: TabNames[];
	activeTab?: TabNames;
	onTabClick?: (tabName: TabNames) => void;
	children?: React.ReactNode;
}

export function TabsPanel({ tabNames, activeTab, onTabClick, children }: TabsProps) {
	const handleTabClick = (tabName: TabNames) => {
		if (onTabClick) {
			onTabClick(tabName);
		}
	}
	return (
		<div className=" flex flex-col gap-2 py-4 border-b border-edge">
			<div className="flex gap-4 tabs">
				{tabNames.map((tabName) => (
					<button
						key={tabName}
						onClick={() => handleTabClick(tabName)}
						className={cx("px-2 py-1 bg-surface cursor-pointer", {
							"text-accent active": activeTab === tabName,
							"not-active": activeTab !== tabName
						})}
					>
						{tabName}
					</button>
				))}
			</div>
			<div>
				{children}
			</div>
		</div>
	)
}
