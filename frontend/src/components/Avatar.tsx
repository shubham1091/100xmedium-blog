
const Avatar = ({ name }: { name: string }) => {
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gradient-to-r from-cyan-200 to-cyan-300 rounded-full">
            <span className="font-medium text-gray-600 text-md">
                {name.substring(0, 2)}
            </span>
        </div>
    );
};

export default Avatar;
