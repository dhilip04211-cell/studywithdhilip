export default function PYQ() {
  useEffect(() => {
    window.location.replace(`${import.meta.env.BASE_URL}PYQ/previous_years.html`);
  }, []);
  return null;
}
