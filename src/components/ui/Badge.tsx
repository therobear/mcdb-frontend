type BadgeProps = {
    label: string;
};

const Badge = ({ label }: BadgeProps) => <div className="badge">{label}</div>;

export default Badge;
