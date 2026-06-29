import logging
from database import SessionLocal, engine, Base
from models import User, ModuleDocument

logger = logging.getLogger("cdd-pro.init")

def check_and_seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        user_count = db.query(User).count()

        if user_count > 0:
            logger.info(
                f"BD ya poblada ({user_count} usuarios). "
                "Saltando seeds de datos base."
            )
        else:
            logger.info(
                f"BD vacía o incompleta ({user_count} usuarios). "
                "Iniciando población de datos base..."
            )

            # Seeds rápidos de profesores ficticios
            try:
                from seed_fictitious import seed_fake_teachers
                seed_fake_teachers()
                logger.info("seed_fictitious completado")
            except Exception as e:
                logger.error(f"Error en seed_fictitious: {e}")

    finally:
        pass

    # Módulo Demo SIEMPRE: tiene su propia validación interna de duplicados.
    try:
        from seed_fictitious_full import generate_demo_module
        generate_demo_module(db)
        logger.info("seed_fictitious_full completado. Módulo Demo creado con éxito.")
    except Exception as e:
        logger.error(f"Error en seed_fictitious_full: {e}")

    db.close()

if __name__ == "__main__":
    check_and_seed_db()
