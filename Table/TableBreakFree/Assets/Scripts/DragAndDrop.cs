using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class DragAndDrop : MonoBehaviour, IPointerDownHandler, IBeginDragHandler, IEndDragHandler, IDragHandler, IDropHandler
{
    private RectTransform rectTransform;
    [SerializeField] private Canvas canvas;


    private void Awake()
    {
        rectTransform = GetComponent<RectTransform>();
    }

    public void OnBeginDrag(PointerEventData eventData) { Debug.Log("OnBeginDrag");
        
    }

    public void OnDrag(PointerEventData eventData) { Debug.Log("Drag");
        rectTransform.anchoredPosition += eventData.delta / canvas.scaleFactor;
    }

    public void OnEndDrag(PointerEventData eventData) { Debug.Log("OnEndDrag"); }

    public void OnPointerDown(PointerEventData eventData) { Debug.Log("OnPointerDown"); }

    public void OnDrop(PointerEventData eventData) { Debug.Log("OnDrop"); }
}
