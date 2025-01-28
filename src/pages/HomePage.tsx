import { Button } from "@mui/material"
import car from "../assets/orig.jpg"

function HomePage() {
    return (
        <>
            <div className="flex flex-col secondaryColor text-white h-screen">
                <div className="primaryColor flex h-20 z-10">
                    <div className="flex relative items-center container gap-10 justify-end">
                        <div className="absolute left-1 cursor-pointer text-3xl font-bold">Такси</div>
                        <Button variant="text" color="inherit">О нас</Button>
                        <Button variant="text" color="inherit">Контакты</Button>
                    </div>
                </div>
                <div className="relative w-full h-full">
                    <img
                        className="absolute top-0 left-0 w-full h-full min-h-full object-cover"
                        src={car}
                        alt="car"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                    <div className="relative z-20 flex flex-col items-center h-full">
                        <div className="flex absolute flex-col left-36 top-24 justify-center h-full">
                            <h1 className="text-6xl font-bold">Добро пожаловать в Такси</h1>
                            <p className="mt-4">Мы предоставляем лучшие услуги такси в городе!</p>
                            <Button variant="contained" color="primary" className="mt-6 w-48 h-14">Заказать такси</Button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export { HomePage };