import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from config import settings

async def test_db():
    _raw_url = settings.DATABASE_URL.split("?")[0]
    DATABASE_URL = _raw_url.replace("postgresql://", "postgresql+asyncpg://")
    print(f"Connecting to: {DATABASE_URL}")
    
    engine = create_async_engine(
        DATABASE_URL,
        echo=True,
        connect_args={"ssl": True},
    )
    
    try:
        async with engine.connect() as conn:
            print("Successfully connected to the database!")
    except Exception as e:
        print(f"Failed to connect: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(test_db())
