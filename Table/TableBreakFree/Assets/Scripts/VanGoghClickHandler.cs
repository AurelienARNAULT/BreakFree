using UnityEngine;

public class VanGoghClickHandler : MonoBehaviour
{
    private void OnMouseDown()
    {
            SocketManager.Instance.SendSocket("click on van gogh");
    }
}