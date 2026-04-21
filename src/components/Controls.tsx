

type ControlsProps = {
	selectedLevel: string;
	onLevelChange: (level: string) => void;
	maxLevel: number;
};

export default function Controls({ selectedLevel, onLevelChange, maxLevel }: ControlsProps) {
	return (
		<div style={{ margin: "20px 0", textAlign: "center" }}>
			<label htmlFor="level-select" style={{ marginRight: 8 }}>Chọn level:</label>
			<select
				id="level-select"
				value={selectedLevel}
				onChange={e => onLevelChange(e.target.value)}
				style={{ padding: 6, fontSize: 16 }}
			>
				<option value="all">Tất cả</option>
				{Array.from({ length: maxLevel }, (_, i) => (
					<option key={i + 1} value={String(i + 1)}>
						Level {i + 1}
					</option>
				))}
			</select>
		</div>
	);
}
