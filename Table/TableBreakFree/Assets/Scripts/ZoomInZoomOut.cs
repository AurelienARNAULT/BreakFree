using UnityEngine;
using UnityEngine.EventSystems;

public class ZoomInZoomOut : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    private Vector3 normalScale;
    [SerializeField] private Vector3 hoverScale = new Vector3(1.2f, 1.2f, 1.2f);

    void Start()
    {
        normalScale = transform.localScale;
    }

    public void OnPointerEnter(PointerEventData eventData)
    {
        Debug.Log("OnPointerEnter");
        transform.localScale = hoverScale;
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        Debug.Log("OnPointerExit");
        transform.localScale = normalScale;
    }
}
